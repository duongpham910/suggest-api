class AutoSuggestService
  NOUN = "名詞"

  STOPWORD = %w(これ それ あれ この その あの ここ そこ あそこ こちら どこ だれ なに なん 何
    私 貴方 貴方方 我々 私達 あの人 あのかた 彼女 彼 です あります おります
    います は が の に を で え から まで より も どの と し それで しかし)


  def initialize
    # @faquestions = Faquestion.all.includes(:faquestion_tags)
    # @faquestions = @faquestions.map{|faq| [faq.id, filter_symbol(faq.question)] if faq.faquestion_tags.present?}.compact
    # @documents = load_document
    # @faquestions = Faquestion.all.uniq
    # @faquestions = @faquestions.map{|faq| [faq.id, filter_symbol(faq.question)]}.compact
    file = File.read("#{Rails.root}/public/corpus/faquestion_corpus.json")
    @documents = JSON.parse(file)
  end

  def make_tag term
    start = Time.now
    term = filter_symbol term
    nm = Natto::MeCab.new
    doc = []
    hash_term = {}
    nm.parse(term) do |n|
      if !n.is_eos?
        doc.push(n.surface)
        hash_term[n.surface] = {counter: count_sub_string(term, n.surface), type: n.feature.split(",")[0]}
      end
    end
    hash_term[:size_doc] = term.split("").size
    doc = doc - STOPWORD

    hash_result = {}
    doc.each do |word|
      value = tfidf(doc, @documents, word, hash_term);
      hash_result[word] = {tfidf: value, type: hash_term[word][:type]}
    end
    finish = Time.now
    puts finish - start
    load_highest_score Hash[hash_result.sort_by{|k,v| v[:tfidf]}.reverse]
  end

  def build_tag
    arr_json = []
    @faquestions.each_with_index do |faq, index|
      puts "#{index}"
      hash_tag = make_tag faq[1]
      arr_json.push({faq[0] => hash_tag})
    end

    File.open("#{Rails.root}/temp.json","w") do |f|
      f.write(arr_json.to_json)
    end
  end

  def read_corpus hash_tag
    file = File.read("#{Rails.root}/temp.json")
    data_hash = JSON.parse(file)
    result = []
    data_hash.each do |tag|
      result << {tag.keys.first => vector_distance(hash_tag, tag.values[0])}
    end
    result
  end

  private
  def filter_symbol term
    term.gsub(/【|】|「|」|（|）|。|：|『|』|・|｛|｝|／|※|～|？|、|\(|\)|\"|\.|\?
      |\/|\:|\-|\d+/,"")
  end

  def tf doc, term, hash_counter
    return hash_counter[term][:counter].to_f / hash_counter[:size_doc]
  end

  def idf docs, term
    n = 0
    docs.each do |doc|
      doc.each do |word|
        if word.include?(term)
          n += 1
          break;
        end
      end
    end
    if n > 0
      return Math.log(docs.size / n.to_f)
    else
      return Math.log(docs.size)
    end

  end

  def tfidf doc, docs, term, hash_counter
    return tf(doc, term, hash_counter) * idf(docs,term) * 100
  end

  def load_document
    documents = []
    nm = Natto::MeCab.new

    @faquestions.each do |faq|
      arr = []
      nm.parse(faq[1]) do |n|
        arr.push(n.surface) if !n.is_eos?
      end
      documents.push arr
    end
    documents
  end

  def count_sub_string string, substring
    begin
      string.scan(/(?=#{substring})/).count
    rescue => error
      string.count(substring)
    end
  end

  def fetch_from_redis
    documents = $redis.get "documents"

    if documents.nil?
      documents = load_document
      $redis.set "documents", documents
    else
      documents = JSON.parse(documents)
    end

    documents
  end

  def vector_distance hash_1, hash_2
    key_arr = (hash_1.keys + hash_2.keys).uniq
    length_of_h1 = 0.0
    length_of_h2 = 0.0
    dot_product = 0.0
    key_arr.each do |key|
      tf_idf_key1 = get_tf_idf hash_1, key
      tf_idf_key2 = get_tf_idf hash_2, key
      length_of_h1 = length_of_h1 + tf_idf_key1 ** 2
      length_of_h2 = length_of_h2 + tf_idf_key2 ** 2
      dot_product = dot_product + (tf_idf_key1 * tf_idf_key2)
    end
    length_of_h1 = Math.sqrt length_of_h1
    length_of_h2 = Math.sqrt length_of_h2
    return dot_product / (length_of_h1 * length_of_h2)
  end

  def get_tf_idf hash_n, key
    if hash_n[key]
      return hash_n[key][:tfidf] || hash_n[key]["tfidf"]
    end
    return 0
  end

  def load_highest_score hash_key
    hash_key.map{|k,v| k if v[:type] == NOUN}.compact.take(10)
  end
end

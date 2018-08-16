class Api::V1::FaquestionsController < Api::V1::BaseController
  def index
    @faquestions = Faquestion.all
    response_success @faquestions
  end

  def suggest_tag
    a = AutoSuggestService.new
    hash_params = JSON.parse params[:faq]
    result = a.make_tag hash_params["question"]
    response_success result
  end
end

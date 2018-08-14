class CreateFaquestionTags < ActiveRecord::Migration[5.2]
  def change
    create_table :faquestion_tags do |t|
      t.integer :faquestion_id
      t.integer :tag_id

      t.timestamps
    end
  end
end

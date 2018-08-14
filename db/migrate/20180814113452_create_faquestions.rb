class CreateFaquestions < ActiveRecord::Migration[5.2]
  def change
    create_table :faquestions do |t|
      t.string :title
      t.text :question
      t.text :answer

      t.timestamps
    end
  end
end

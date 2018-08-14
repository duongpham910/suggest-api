class Tag < ApplicationRecord
  acts_as_paranoid

  has_many :faquestion_tags, class_name: FaquestionTag.name,
    foreign_key: "tag_id", dependent: :destroy

  belongs_to :parent, class_name: "Tag", foreign_key: "parent_id"
end

class Faquestion < ApplicationRecord
  acts_as_paranoid

  has_many :faquestion_tags
end

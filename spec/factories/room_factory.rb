FactoryBot.define do
  factory :room do
    name { Faker::Coffee.blend_name }
  end
end

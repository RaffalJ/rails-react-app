FactoryBot.define do
  factory :room_message do
    message { Faker::Coffee.blend_name }
    user
    room
  end
end

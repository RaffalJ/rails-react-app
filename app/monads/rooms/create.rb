require 'dry/monads/all'

class Rooms::Create
  include Dry::Monads
  include Dry::Monads::Do.for(:call)

  def call(params)
    validated_data = yield validateParams(params)
    persist(validated_data)
  end

  def validateParams(params)
    name = params['name']

    if name.length > 12
      Failure('Validation failed')
    else
      Success(params)
    end
  end

  def persist(params)
    room = Room.create(params)
    Success(room)
  end
end

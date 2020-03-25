require 'rails_helper'

RSpec.describe ApplicationCable::Connection, type: :channel do
  let(:user) { create(:user) }

  it 'successfully connects' do
    cookies.signed['user.id'] = user.id
    connect '/cable'

    expect(connection.current_user).to eq(user)
  end

  it 'rejects connection when no user id is provided' do
    expect { connect '/cable' }.to have_rejected_connection
  end

  it 'rejects connection when wrong user is provided' do
    cookies.signed['user.id'] = '123_abc'

    expect{ connect '/cable' }.to raise_error(ActionCable::Connection::Authorization::UnauthorizedError)
  end
end

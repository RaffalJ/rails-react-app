class CreateRoomMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :room_messages, id: :uuid do |t|
      t.references :room, type: :uuid, index: true
      t.references :user, type: :uuid, index: true
      t.text :message

      t.timestamps
    end
  end
end

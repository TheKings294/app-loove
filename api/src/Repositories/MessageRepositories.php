<?php

namespace App\Repositories;

class MessageRepositories extends BaseRepositories {
    public function newMessage($user_A, $convID, $content)
    {
        $this
            ->query("INSERT INTO messages (conversation_id, user_send_it, content, date_and_hour_of_send) VALUES (:conversationID, :senderID, :message, :date)")
            ->execute([
                'conversationID' => $convID,
                'senderID' => $user_A,
                'message' => $content,
                'date' => date('Y-m-d H:i:s')
            ]);
    }
    public function getMessagesOfConv(int $convID)
    {
        return $this
            ->query("SELECT * FROM messages WHERE conversation_id = :convID")
            ->fetch([
                'convID' => $convID
            ]);
    }
}
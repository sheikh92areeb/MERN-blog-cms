"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { IComment } from "@/lib/models/comment.model";

interface CommentProps {
  comment: IComment;
  onReply: (parentId: string) => void;
  onDelete: (commentId: string) => void;
  sessionUserId: string;
  isAdmin: boolean;
}

const CommentItem: React.FC<CommentProps> = ({
  comment,
  onReply,
  onDelete,
  sessionUserId,
  isAdmin,
}) => {
  return (
    <div className="mb-4 rounded-md bg-gray-50 p-3">
      <div className="flex items-center space-x-2">
        {/* <Image
          src={(comment.userId as any).image || "/default-avatar.png"}
          alt={(comment.userId as any).name || "User"}
          width={30}
          height={30}
          className="rounded-full"
        /> */}
        <span className="font-semibold">
          {(comment.userId as any)?.name || "Anonymous"}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="mt-2 text-gray-800">{comment.content}</p>
      <div className="mt-2 flex space-x-2">
        {sessionUserId && (
          <Button onClick={() => onReply(comment._id as any)} variant="link" size="sm">
            Reply
          </Button>
        )}
        {(sessionUserId === (comment.userId as any)?._id.toString() || isAdmin) && (
          <Button
            onClick={() => onDelete(comment._id as any)}
            variant="link"
            size="sm"
            className="text-red-500"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

interface CommentSectionProps {
  blogId: string;
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<IComment[]>([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments?blogId=${blogId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmitComment = async (parentId: string | null = null) => {
    if (!newCommentContent.trim()) return;

    try {
      await axios.post("/api/comments", {
        blogId,
        content: newCommentContent,
        parentId,
      });
      setNewCommentContent("");
      setReplyingTo(null);
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`/api/comments/${commentId}`);
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
    setNewCommentContent("");
  };

  const sortedComments = comments
    .filter((comment) => !comment.parentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getReplies = (parentId: string) =>
    comments
      .filter((comment) => comment.parentId?.toString() === parentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const sessionUserId = (session?.user as any)?._id?.toString();
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Comments</h2>

      {sessionUserId && (
        <div className="mb-6">
          <textarea
            className="w-full rounded-md border p-2"
            rows={3}
            placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          ></textarea>
          <Button
            onClick={() => handleSubmitComment(replyingTo)}
            className="mt-2"
            disabled={!newCommentContent.trim()}
          >
            {replyingTo ? "Submit Reply" : "Submit Comment"}
          </Button>
          {replyingTo && (
            <Button
              onClick={() => setReplyingTo(null)}
              variant="ghost"
              className="mt-2 ml-2"
            >
              Cancel Reply
            </Button>
          )}
        </div>
      )}

      {sortedComments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <div>
          {sortedComments.map((comment) => (
            <div key={comment._id as any} className="mb-4">
              <CommentItem
                comment={comment}
                onReply={handleReply}
                onDelete={handleDeleteComment}
                sessionUserId={sessionUserId}
                isAdmin={isAdmin}
              />
              <div className="ml-8 mt-2">
                {getReplies(comment._id as any).map((reply) => (
                  <CommentItem
                    key={reply._id as any}
                    comment={reply}
                    onReply={handleReply}
                    onDelete={handleDeleteComment}
                    sessionUserId={sessionUserId}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

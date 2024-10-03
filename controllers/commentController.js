import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

export const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({
            content,
            author: req.user._id,
            post: req.params.postId
        });

        const savedComment = await comment.save();
        await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
};

export const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('author', 'username');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to update this comment' });
        }

        comment.content = content;
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this comment' });
        }

        await comment.deleteOne();
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

        res.json({ message: 'Comment removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const pageSize = 20;
        const currentPage = Number(req.query.page) || 1;
        const count = await Comment.countDocuments();
        const comments = await Comment.find()
            .limit(pageSize)
            .sort({ createdAt: -1 })
            .skip(pageSize * (currentPage - 1))
            .populate('author', 'username');

        res.json({ comments, currentPage, totalPageCount: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Error get all comments', error: error.message });
    }
};
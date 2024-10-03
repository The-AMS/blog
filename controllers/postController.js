import Post from '../models/postModel.js';

export const createPost = async (req, res) => {
    try {
        // const { title, content, category } = req.body; //replace 
        const { title, content } = req.body;
        const post = new Post({
            title,
            content,
            // category,
            author: req.user._id
        });

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username');
        // .populate('category', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        // const { title, content, category } = req.body;
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to update this post' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        // post.category = category || post.category;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this post' });
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const pageSize = 10;
        const currentPage = Number(req.query.page) || 1;

        const count = await Post.countDocuments();
        const posts = await Post.find()
            .limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .sort({ createdAt: -1 })
            .populate('author', 'username')
            .populate('category', 'name');

        res.json({ posts, currentPage, totalPageCount: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};











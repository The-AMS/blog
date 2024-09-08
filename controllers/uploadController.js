import path from 'path';
import fs from 'fs';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Here you might want to process the image, resize it, etc.
        // For this example, we're just sending back the file information

        res.status(200).json({
            message: 'File uploaded successfully',
            filename: req.file.filename,
            path: req.file.path
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
};

export const getImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join('uploads', filename);

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.sendFile(filepath);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image', error: error.message });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join('uploads', filename);

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete file
        fs.unlinkSync(filepath);

        res.json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting image', error: error.message });
    }
};
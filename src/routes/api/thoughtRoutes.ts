import { Router } from 'express';

const router = Router();

import { 
    createThought,
    getAllThoughts, 
    getThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction 
} from '../../controllers/thoughtController.js';

// Route for creating a new thought
router.post('/', createThought);

// Route for getting all thoughts
router.get('/', getAllThoughts);


// Routes for handling a specific thought by ID for updating and deleting
router.get('/:thoughtId', getThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

// Routes for managing reactions to a thought
router.post('/:thoughtId/reactions', addReaction);    
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
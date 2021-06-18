import { useRef } from 'react';
import { motion } from 'framer-motion'

import styles from '../styles/NewMeetupForm.module.css';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0,
      type: 'spring',
      stiffness: 110,
      mass: 0.5,
      damping: 9,
      duration: 0.25,
      staggerChildren: 0.15,
      delayChildren: 0.4      
    } 
  },
  exit: {
    transition: { ease: 'easeInOut' }
  }
}

const itemVariant = {
  hidden: { opacity: 0, scale: 0.1 },
  visible: { opacity: 1, scale: 1,}
}


function NewMeetupForm({ onAddMeetup }) {
  const titleInputRef = useRef();
  const gameInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredGame = gameInputRef.current.value;
    const enteredImage = imageInputRef.current.value || '/default.jpg';
    const enteredAddress = addressInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    if(enteredGame === 'none') { return; }

    const meetupData = {
      title: enteredTitle,
      game: enteredGame,
      image: enteredImage,
      address: enteredAddress,
      date: enteredDate,
      time: enteredTime,
      description: enteredDescription,
    };
 
    onAddMeetup(meetupData);
  }

  return (
      <motion.form 
        className={styles.form} 
        onSubmit={submitHandler}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"   
      >
        <div className={styles.control}>
          <motion.label 
            variants={itemVariant} 
            htmlFor='title'
          >Meetup Title *</motion.label>
          <motion.input 
            variants={itemVariant} 
            type='text' 
            required 
            id='title' 
            ref={titleInputRef}
          />
        </div>
        <div className={styles.control}>
          <motion.select 
            variants={itemVariant} 
            ref={gameInputRef} 
          >
            <option disabled value="none">Select Meetup Type *</option>
            <option value="board-gaming">Board Game</option>
            <option value="computer-gaming">Computer Game</option>
            <option value="console-gaming">Console Game</option>
            <option value="activity">Activity</option>
          </motion.select>
        </div>
        <div className={styles.control}>
          <motion.label 
            variants={itemVariant} 
            htmlFor='address'
          >
            Address *</motion.label>
          <motion.input 
            variants={itemVariant} 
            type='text' 
            required 
            id='address' 
            ref={addressInputRef} 
          />
        </div>

        <motion.div className={styles.squish} variants={itemVariant}>
          <div className={styles.control}>
            <label htmlFor='date'>
              Date *</label>
            <input 
              type='date' 
              required 
              id='date' 
              ref={dateInputRef} 
            />
          </div>
          <div className={styles.control}>
            <label htmlFor='time'>
              Time *</label>
            <input 
              type='time' 
              required 
              id='time' 
              ref={timeInputRef} 
            />
          </div>
        </motion.div>

        <div className={styles.control}>
          <motion.label 
            variants={itemVariant}  
            htmlFor='description'
          >
            Description</motion.label>
          <motion.textarea 
            variants={itemVariant} 
            id='description'
            rows='5'
            style={{ maxWidth: '100%' }}
            ref={descriptionInputRef}
          ></motion.textarea>
        </div>
        <div className={styles.control}>
          <motion.label 
            variants={itemVariant} 
            htmlFor='image'
          >Meetup Image</motion.label>
          <motion.input 
            variants={itemVariant} 
            type='url' 
            id='image' 
            ref={imageInputRef} 
          />
        </div>        
        <div className={styles.actions}>
          <motion.button 
            variants={itemVariant} 
            whileHover={{ 
              scale:1.05, 
              backgroundColor: 'var(--orange)',
              color: 'var(--blue)',
              cursor: 'pointer'
            }} 
            whileTap={{ scale: 0.9975 }}
            transition={{ duration: 0.2 }}          
          >Add Meetup</motion.button>
        </div>
      </motion.form>
  );
}

export default NewMeetupForm;
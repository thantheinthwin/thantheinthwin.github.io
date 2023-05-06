import React, { forwardRef, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion';
import { Box, Button, TextField, Typography, Snackbar, IconButton } from '@mui/material';

import { IoMailOutline } from 'react-icons/io5'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { TbBrandMessenger, TbBrandTelegram } from 'react-icons/tb'
import { BsSend } from 'react-icons/bs';
import CloseIcon from '@mui/icons-material/Close';

import emailjs from '@emailjs/browser';

const Contact = forwardRef((state, ref) => {
  const titleRef = useRef();
  const isInView = useInView(titleRef, {once: true});

  // Form
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    message: ''
  });

  const resetForm = () => {
    setFormValues({
      username: '',
      email: '',
      message: ''
    })
  }
  
  // Email
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    resetForm();

    emailjs.sendForm('service_3isfi89', 'template_9jbhg1o', form.current, 'KtdIzBfSS9mn3tuVT')
      .then((result) => {
          console.log(result.text);
          setOpen(true);
      }, (error) => {
          console.log(error.text);
      });
  };

  // Snack bar
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      }
    }
  }

  const title = {
    hidden: {opacity: 0, y: 200 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1.6,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };

  const subtitle = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 1.6,
        delay: 1.5
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };

  const contact = [
    {
      icon: <IoMailOutline className='w-full text-2xl'/>,
      platform: 'Email',
      contact: 'thantheinthwin.dev@gmail.com'
    },
    {
      icon: <TbBrandMessenger className='w-full text-2xl'/>,
      platform: 'Messenger',
      contact: 'm.me/thantheinthwin.steve',
      url: 'https://m.me/thantheinthwin.steve'
    },
    {
      icon: <TbBrandTelegram className='w-full text-2xl'/>,
      platform: 'Telegram',
      contact: 't.me/thantheinthwin',
      url: 'https://t.me/thantheinthwin'
    }
  ]
  
  return (
    <motion.section
      id="contact"
      className="relative flex justify-center p-8 bg-white snap-start dark:bg-neutral-700"
    >
      <div
        ref={ref}
        className="flex flex-col items-center justify-center w-full h-full gap-4 dark:text-white"
      >
        <div className="grid w-full text-center" ref={titleRef}>
          {isInView && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-12"
            >
              <motion.div variants={title} className="col-span-full">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Contact Me
                </Typography>
              </motion.div>
              <motion.div variants={title} className="col-span-full">
                <Typography variant="body2" sx={{ color: "grey.700" }}>
                  Get in touch with me
                </Typography>
              </motion.div>
              <motion.div variants={subtitle} className="col-span-full">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold" }}
                  className="col-span-full"
                >
                  Talk to me
                </Typography>
              </motion.div>
              <motion.div className="grid justify-center grid-cols-1 col-span-10 col-start-2 gap-4 mt-8 text-center md:col-span-6 md:col-start-4 lg:col-span-10 lg:col-start-2 lg:grid-cols-3 xl:col-span-8 xl:col-start-3">
                <div className="grid col-span-1 gap-4">
                  {contact.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={title}
                      className="grid justify-center p-2 border border-black rounded-md lg:p-4 dark:border-white col-span-full"
                    >
                      {item.icon}
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {item.platform}
                      </Typography>
                      <Typography variant="body2">{item.contact}</Typography>
                      {i == 0 && (
                        <Box
                          onClick={() =>
                            (document.location.href =
                              "mailto:thantheinthwin.dev@gmail.com")
                          }
                          className="flex items-center justify-center gap-1"
                          sx={{ color: "grey.700", fontSize: "small" }}
                        >
                          <Typography variant="body2" className="my-2">
                            Write Me{" "}
                          </Typography>
                          <motion.i
                            animate={{ x: 1 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <HiOutlineArrowNarrowRight />
                          </motion.i>
                        </Box>
                      )}
                      {i !== 0 && (
                        <Box
                          onClick={() => {
                            window.open(item.url);
                          }}
                          className="flex items-center justify-center gap-1"
                          sx={{ color: "grey.700", fontSize: "small" }}
                        >
                          <Typography variant="body2" className="my-2">
                            Write Me{" "}
                          </Typography>
                          <motion.i
                            animate={{ x: 1 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <HiOutlineArrowNarrowRight />
                          </motion.i>
                        </Box>
                      )}
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  variants={subtitle}
                  className="hidden col-span-2 border border-black rounded-md lg:flex lg:flex-col"
                >
                  <form className="flex flex-col gap-6 p-4" ref={form} onSubmit={sendEmail}>
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      color="grey"
                      name='user_name'
                      required
                      value={formValues.username}
                      onChange={(e) =>
                        setFormValues({ ...formValues, username: e.target.value })
                      }
                    />
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      color="grey"
                      name='user_email'
                      required
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                      }
                    />
                    <TextField
                      id="message"
                      label="Message"
                      variant="outlined"
                      color="grey"
                      name='message'
                      required
                      value={formValues.message}
                      onChange={(e) =>
                        setFormValues({ ...formValues, message: e.target.value })
                      }
                      multiline
                      rows={7}
                    />
                    <Button
                      className="self-end p-4 bg-black rounded-md shadow-none hover:bg-black hover:shadow-none dark:bg-white w-max"
                      variant="contained"
                      type='submit'
                      value='Send'  
                      endIcon={<BsSend/>}
                    >
                      Send Message
                    </Button>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message="Message sent"
                      action={action}
                    />
                  </form>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
})

export default Contact
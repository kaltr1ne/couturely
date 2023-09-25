import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
} from '@mui/material';

const ContactPage = () => {
  const containerStyle = {
    paddingTop: '2rem',
  };

  const paperStyle = {
    padding: '2rem',
  marginTop: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
  };

  const headingStyle = {
    fontSize: '36px',
    marginBottom: '1rem',
    color: '#333',
  };

  const subheadingStyle = {
    fontSize: '24px',
    marginBottom: '2rem',
    color: '#555',
  };

  const contactInfoStyle = {
    marginBottom: '2rem',
    color: '#555',
  };

  const buttonStyle = {
    backgroundColor: 'rgb(221, 162, 172)', // Pinkish color
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff6f61', // Lighter pink on hover
  };

  return (
    <Container maxWidth="md" style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" align="center" style={headingStyle}>
          Contact Us
        </Typography>
        <Typography variant="h6" align="center" style={subheadingStyle}>
          We'd love to hear from you!
        </Typography>

        <Grid container spacing={3} style={contactInfoStyle}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Address:</strong>
              <br />
              47 W 13th St, New York, NY 10011, USA
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Contact Information:</strong>
              <br />
              Email: contact@example.com
              <br />
              Phone: +123 456 7890
              <br />
              Fax: +123 456 7891
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ margin: '2rem 0' }} />

        <Typography variant="h5" style={{ color: '#333' }}>
          Location
        </Typography>

        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24493.215083570966!2d-74.00530133115255!3d40.73566726212995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2597c8abfa29d%3A0x6aa8f681edac5206!2s47%20W%2013th%20St%2C%20New%20York%2C%20NY%2010011%2C%20USA!5e0!3m2!1sen!2s!4v1672018983406!5m2!1sen!2s"
            width="100%"
            height="300"
            style={{ border: '0' }}
            allowFullScreen
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>

        <a href="mailto:couturely@gmail.com">
          <Button
            variant="contained"
            style={buttonStyle}
            fullWidth
            onMouseOver={() => {
              Object.assign(buttonStyle, buttonHoverStyle);
            }}
            onMouseOut={() => {
              Object.assign(buttonStyle, { backgroundColor: 'rgb(221, 162, 172)' });
            }}
          >
            Contact Us
          </Button>
        </a>
      </Paper>
    </Container>
  );
};

export default ContactPage;

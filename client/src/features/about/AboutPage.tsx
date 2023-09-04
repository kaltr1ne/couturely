import React from 'react';
import {
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grow,
} from '@mui/material';

export default function AboutPage() {
  const containerStyle = {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  };

  const sectionStyle = {
    marginBottom: '2rem',
  };

  const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  };

  const mediaStyle = {
    width: '40%',
    borderRadius: '8px',
  };

  const contentStyle = {
    width: '58%',
  };

  const buttonStyle = {
    marginTop: '1rem',
  };

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO',
      image: '/images/ceo.jpg', // Replace with team member's image
    },
    {
      name: 'Jane Smith',
      role: 'COO',
      image: '/images/coo.jpg', // Replace with team member's image
    },
    {
      name: 'Alice Johnson',
      role: 'CTO',
      image: '/images/cto.jpg', // Replace with team member's image
    },
  ];

  return (
    <div style={containerStyle}>
      <Container maxWidth="lg">
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <section style={sectionStyle}>
            <Typography variant="h2" align="center" gutterBottom style={{ fontSize: '2rem' }}>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to Our Business! We're passionate about what we do and are
              excited to share our story with you. Our journey began as a small idea, born out of a shared passion for{' '}
              <span style={{ fontFamily: 'CurvyFont', fontWeight: 'bold', color: 'rgb(221,162,175)', fontStyle: 'italic'}}>
                Couturely
              </span>.{' '}
              It all started from our passion about this thing. Since our humble beginnings, we've grown and expanded, thanks to
              the support of our loyal customers and dedicated team. We remain committed to providing top-quality
              products/services and exceeding your expectations.
            </Typography>
            <Typography variant="body1" paragraph>
              As we continue to grow, we look forward to serving you and being a part of your story. Thank you for being a part of our journey.
            </Typography>
          </section>

          <Divider />

          <section style={sectionStyle}>
            <Card style={cardStyle}>
              <CardMedia
                component="img"
                style={mediaStyle}
                image="/images/History.jpg" // Replace with your image
                alt="Our Team"
              />
              <CardContent style={contentStyle}>
                <Typography variant="h4" gutterBottom>
                  Our Journey
                </Typography>
                <Typography variant="body1" paragraph>
                  Our business began as a small idea, born out of a shared passion
                  for [insert your business area]. It all started when [describe
                  the founding story, what inspired you, and your vision].
                </Typography>
                <Typography variant="body1" paragraph>
                  Since our humble beginnings, we've grown and expanded, thanks to
                  the support of our loyal customers and dedicated team. We
                  remain committed to providing top-quality
                  products/services and exceeding your expectations.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/contact"
                  style={{ ...buttonStyle, backgroundColor: 'rgb(221,162,172)' }}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </section>

          <section style={{ ...sectionStyle, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Our Team
            </Typography>
            <Grid container spacing={3}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Grow in={true} timeout={index * 500}>
                    <Card>
                      <CardMedia
                        component="img"
                        src={member.image}
                        alt={member.name}
                        style={{ height: '200px' }}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {member.name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          {member.role}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </section>
        </Paper>
      </Container>
    </div>
  );
}

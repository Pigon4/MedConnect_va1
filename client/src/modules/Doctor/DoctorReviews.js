import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const DoctorReviews = () => {

    const reviews = [
    {
      id: 1,
      userName: "John Doe",
      rating: 5,
      comment: "Excellent consultation! Doctor was patient and explained everything clearly.",
      date: "Nov 5, 2025"
    },
    {
      id: 2,
      userName: "Sarah Smith",
      rating: 4,
      comment: "Good experience overall, but the waiting time could be improved.",
      date: "Nov 3, 2025"
    },
    {
      id: 3,
      userName: "Michael Brown",
      rating: 5,
      comment: "Very professional and friendly. Highly recommend!",
      date: "Oct 29, 2025"
    }
  ];

      const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

    return(

    <Container className="py-4">
      <h2 className="mb-4 text-center">Patient Reviews</h2>
      <Row>
        {reviews.map((review) => (
          <Col md={6} lg={4} key={review.id} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title>{review.userName}</Card.Title>
                  <Badge bg="info">{review.date}</Badge>
                </div>
                <Card.Subtitle className="mb-2 text-muted">
                  {renderStars(review.rating)}
                </Card.Subtitle>
                <Card.Text>{review.comment}</Card.Text>
                <Button variant="outline-primary" size="sm">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    );
};

export default DoctorReviews;
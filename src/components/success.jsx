import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
    navigate('/');
};

    return (
    <Card>
        <CardHeader>Başarılı!</CardHeader>
        <CardBody>
            <p>Form başarıyla dolduruldu.</p>
        <Button color="primary" onClick={handleBackToLogin}>
        Geri Dön
        </Button>
        </CardBody>
    </Card>
);
};

export default Success;

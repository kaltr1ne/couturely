import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import {Button, Card, CardMedia, CardContent, Typography, CardActions, CardHeader, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props{
    product: Product;
}
export default function ProductCard({product}:Props){
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return(
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'rgb(177,113,124)'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color:'gray'}
                }}
            />
        	<CardMedia
                sx={{ height: 396, backgroundSize: 'contain', bgcolor: 'pink' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='rgb(177,113,124)' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                loading={status.includes('pendingAddItem' + product.id)} 
                onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
                size="small">Add to Card</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`}size="small">View</Button>
            </CardActions>
        </Card>
    )
}
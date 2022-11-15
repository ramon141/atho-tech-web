import { Grid, TextField } from '@mui/material';

const classes = {
    root: {
        borderBottom: 'solid 2px #1976D2',
        borderRadius: '10px',
        minHeight: 130
    },
}

let originalValue = {};

export default function Item({ product, configuration, onChangeValue }) {

    //Mantém os valores originais do produto
    if (!originalValue[configuration.id]) { //Se o valor não foi salvo no objeto
        originalValue[configuration.id] = configuration.value; //Ele salva
    }

    const updateValueUsingFormated = () => {
        const number = parseFloat(configuration.value);
        const numberFormated = number.toFixed(2);

        if (!isNaN(numberFormated) && isFinite(numberFormated)) {
            onChangeValue(numberFormated, configuration, product)
        } else {
            onChangeValue(originalValue[configuration.id], configuration, product, false)
        }

    }

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={classes.root}
            spacing={2}
        >
            <Grid item xs={6} sm={6} md={6}>
                {product.description}
                {configuration.description.length > 1 ? ' - ' : ''}
                {configuration.description}
            </Grid>

            <Grid item xs={5.5} sm={5.5} md={5.5} style={{ textAlign: 'center' }}>
                <TextField
                    fullWidth
                    type='number'
                    label='Valor'
                    value={configuration.value}
                    onChange={(e) => onChangeValue(e.target.value, configuration, product)}
                    onBlur={updateValueUsingFormated}
                    size='small'
                />
            </Grid>

        </Grid>
    );
}
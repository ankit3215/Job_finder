import {
    Grid,
    Paper,
    Container,
    makeStyles
} from "@material-ui/core";


const styles = makeStyles(() => ({
    paper: {
        padding: '3em 5em 10em',
        width: '35%',
        background: '#203647'
    },
    container: {
        height: '100%',
    }
}))

const FormOuter = ({children}) => {
    const classes = styles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container className={classes.container} justify="center" alignItems="center">
                <Paper className={classes.paper} elevation={2} square={true}>
                    { children}
                </Paper>
            </Grid>
        </Container>
    )
}
 
export default FormOuter;
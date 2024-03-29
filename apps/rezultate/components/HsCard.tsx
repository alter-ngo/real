import { Avatar, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import NumbersIcon from '@mui/icons-material/Numbers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HsCard({ hs, real, pos, records }: { hs: string, real: number, pos: number, records?: number }) {
    return (
        <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: "100%", minHeight: "100%" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Locul {pos}
                </Typography>
                <Typography sx={{ my: 2 }} variant="h6" component="div">{hs}</Typography>
                <Chip variant="outlined" color="default" sx={{ my: 1 }} label={`Scor REAL: ${real.toFixed(2)}`} avatar={<Avatar src="/logo.png" />} />&nbsp;
                {records && <Chip color="default" label={records === 1 ? `Un respondent` : `${records} respondenți`} icon={<NumbersIcon />} />}
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" href={`/${hs}`} endIcon={<ArrowForwardIcon />}>Vezi datele liceului</Button>
            </CardActions>
        </Card>
    )
}
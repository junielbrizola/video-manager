import MuiCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FC } from 'react'

type Props = {
    name: string,
    description?: string | null,
    slug?: string | null,
    updated_at: string,
    created_at: string,
    EditOnClick: () => void,
    DeleteOnClick: () => void,
    AreaOnClick: () => void
}

const Card: FC<Props> = ({
    name,
    description,
    slug,
    created_at,
    updated_at,
    EditOnClick,
    DeleteOnClick,
    AreaOnClick
}) => {
  
  return (
  
        <MuiCard>
            <CardActionArea
                onClick={AreaOnClick} 
            >
                <CardContent>
                    {name && (
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                    )}
                    {description && (
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Descrição:</strong>
                            {` ${description}`}
                        </Typography>
                    )}
                    {slug && (
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Slug:</strong>
                            {` ${slug}`}
                        </Typography>
                    )}
                </CardContent>
                <CardContent>
                    {created_at && (
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            <strong>Criação:</strong>
                            {` ${created_at}`}
                        </Typography>
                    )}
                    {updated_at && (
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Atualização:</strong>
                            {` ${updated_at}`}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </MuiCard>
    )
}

export default Card
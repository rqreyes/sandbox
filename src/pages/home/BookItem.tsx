import { Delete, Edit } from "@mui/icons-material";
import { Button, Divider, ListItem, ListItemText } from "@mui/material";

interface BookItemProps {
  author: string;
  title: string;
}

export const BookItem: React.FC<BookItemProps> = ({
  author,
  title,
}): JSX.Element => (
  <>
    <ListItem>
      <ListItemText>
        <strong>{title}</strong>
        <br />
        {author}
      </ListItemText>
      <Button>
        <Edit />
      </Button>
      <Button>
        <Delete />
      </Button>
    </ListItem>
    <Divider />
  </>
);

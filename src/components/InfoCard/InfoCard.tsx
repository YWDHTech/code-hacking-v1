import {
  Avatar,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";

type Props = {
  label: string;
  value: string;
  color: string;
  Icon: any;
  loading?: boolean;
};

export default function InfoCard({
  Icon,
  value,
  label,
  color,
  loading,
}: Props) {
  return (
    <Card>
      <CardContent sx={{ py: 0, pb: "0 !important" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          {loading ? (
            <Skeleton variant={"circular"} width={70} height={54} />
          ) : (
            <Avatar sx={{ width: 54, height: 54, backgroundColor: color }}>
              <Icon sx={{ color: "common.white" }} />
            </Avatar>
          )}
          <ListItem>
            {loading ? (
              <Stack direction={"column"}>
                <Skeleton variant={"text"} width={100} />
                <Skeleton variant={"text"} width={150} />
              </Stack>
            ) : (
              <ListItemText
                primary={value}
                secondary={label}
                primaryTypographyProps={{ variant: "h6" }}
              />
            )}
          </ListItem>
        </Stack>
      </CardContent>
    </Card>
  );
}

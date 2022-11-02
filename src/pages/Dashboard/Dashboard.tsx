import { Box, Grid, Typography } from "@mui/material";
import DashboardStyles from "./DashboardStyles";
import { useQuery } from "react-query";
import Api from "../../helpers/Api";
import { useAppSelector } from "../../redux/store";
import { ApiResponse, ContactType, TableColumnType } from "../../helpers/type";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import Table from "../../components/Table/Table";
import ContactColumns from "../../helpers/ContactColumns";

export default function Dashboard() {
  const { classes } = DashboardStyles();
  const { accessToken } = useAppSelector((store) => store.user);

  const { isLoading, data, isError } = useQuery<
    ApiResponse<ContactType[]>,
    ApiResponse<null>
  >("contacts", async () => {
    return (await Api.getContacts(accessToken)) as any;
  });

  const contacts: ContactType[] = (data?.data || []) as ContactType[];
  const columns: TableColumnType<ContactType>[] = ContactColumns();

  if (isError) return null;

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography className={classes.header} variant={"h4"}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <DashboardCards contacts={contacts} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Table
            columns={columns}
            rows={[...contacts].splice(0, 10)}
            hideIndex
            loading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

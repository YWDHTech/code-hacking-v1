import { Box, Button, Grid, Typography } from "@mui/material";
import contactsStyles from "./ContactsStyles";
import { Add } from "@mui/icons-material";
import Table from "../../components/Table/Table";
import { useQuery } from "react-query";
import Api from "../../helpers/Api";
import { useAppSelector } from "../../redux/store";
import { ApiResponse, ContactType, TableColumnType } from "../../helpers/type";
import { useState } from "react";
import CreateContact from "../../modals/CreateContact/CreateContact";
import ContactColumns from "../../helpers/ContactColumns";
import DeleteContact from "../../modals/DeleteContact/DeleteContact";

export default function Contacts() {
  const { classes } = contactsStyles();
  const { accessToken } = useAppSelector((store) => store.user);
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteContact, setDeleteContact] = useState<string>();
  const handleOpenDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteContact(id);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const { isLoading, data, isError } = useQuery<ApiResponse<ContactType[]>>(
    "contacts",
    async () => {
      return (await Api.getContacts(accessToken)) as any;
    }
  );

  const contacts: ContactType[] = (data?.data || []) as ContactType[];
  const columns: TableColumnType<ContactType>[] =
    ContactColumns(handleOpenDelete);

  if (isError) return null;

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={6}>
          <Typography className={classes.header} variant={"h4"}>
            Contacts
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          justifyContent={"end"}
          sx={{ display: "flex" }}
        >
          <Button
            onClick={handleOpenCreate}
            variant={"contained"}
            color={"primary"}
            startIcon={<Add />}
          >
            Contact
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Table columns={columns} rows={contacts} loading={isLoading} />
        </Grid>
      </Grid>
      <CreateContact open={openCreate} handleClose={handleCloseCreate} />
      <DeleteContact
        id={deleteContact}
        open={openDelete}
        handleClose={handleCloseDelete}
      />
    </Box>
  );
}

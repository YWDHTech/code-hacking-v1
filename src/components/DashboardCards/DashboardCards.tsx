import { Grid, useTheme } from "@mui/material";
import InfoCard from "../InfoCard/InfoCard";
import Utilities from "../../helpers/utilities";
import { Contacts, Email, Home } from "@mui/icons-material";
import { ContactType } from "../../helpers/type";

type Props = {
  contacts: ContactType[];
  isLoading: boolean;
};

export default function DashboardCards({ contacts, isLoading }: Props) {
  const theme = useTheme();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <InfoCard
          loading={isLoading}
          value={Utilities.toNumber(contacts.length)}
          color={theme.palette.primary.main}
          label={"All Contacts"}
          Icon={Contacts}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <InfoCard
          loading={isLoading}
          value={Utilities.toNumber(
            contacts.filter((contact) => !!contact.emailAddress).length
          )}
          color={theme.palette.info.main}
          label={"Contacts with Email"}
          Icon={Email}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <InfoCard
          loading={isLoading}
          value={Utilities.toNumber(
            contacts.filter((contact) => !!contact.address).length
          )}
          color={theme.palette.success.main}
          label={"Contacts with Address"}
          Icon={Home}
        />
      </Grid>
    </Grid>
  );
}

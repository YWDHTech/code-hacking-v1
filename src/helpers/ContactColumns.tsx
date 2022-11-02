import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ContactPhone, Delete } from "@mui/icons-material";
import { ContactType, TableColumnType } from "./type";

export default function ContactColumns(openDelete?: (id: string) => void) {
  const list = [
    {
      key: "firstname",
      label: "Contact",
      render: ({ row }) => (
        <ListItem disablePadding disableGutters>
          <ListItemAvatar>
            <Avatar
              sx={{ backgroundColor: "primary.main", width: 45, height: 45 }}
            >
              <ContactPhone sx={{ color: "common.white" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${row.firstname} ${row.middleName} ${row.lastname}`}
            secondary={row.address}
          />
        </ListItem>
      ),
    },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "emailAddress", label: "Email Address" },
  ] as TableColumnType<ContactType>[];

  if (openDelete) {
    list.push({
      key: "action",
      label: "Action",
      align: "right",
      render: ({ row }) => (
        <IconButton color={"error"} onClick={() => openDelete(row.id)}>
          <Delete fontSize={"small"} />
        </IconButton>
      ),
    });
  }

  return list;
}

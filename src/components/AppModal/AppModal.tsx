import { Backdrop, Box, Modal } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  width?: string;
  children: ReactNode;
};

export default function AppModal({
  open,
  handleClose,
  width,
  children,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Backdrop
        open={open}
        sx={{ alignItems: "flex-start", py: 10, px: 3 }}
        onClick={(e) => {
          if (!e.defaultPrevented) {
            handleClose();
          }
        }}
      >
        <Box
          onClick={(e) => {
            e.preventDefault();
          }}
          sx={{ width }}
        >
          {children}
        </Box>
      </Backdrop>
    </Modal>
  );
}

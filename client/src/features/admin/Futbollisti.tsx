//Futbollisti.tsx in admin folder
import React, { useState } from "react";
import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useFutbollisti from "../../app/hooks/useFutbollisti";
import { useAppDispatch } from "../../app/store/configureStore";
import { removeFutbollisti } from "../../features/futbollisti/futbollistiSlice";
import AppPagination from "../../app/components/AppPagination";
import FutbollistiForm from "./FutbollistiForm";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { Footballer } from "../../app/models/futbollisti";

export default function Futbollisti() {
  const { futbollisti, metaData } = useFutbollisti();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedFutbollisti, setSelectedFutbollisti] = useState<Footballer | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleSelectFutbollisti(futbollisti: Footballer) {
    setSelectedFutbollisti(futbollisti);
    setEditMode(true);
  }

  function handleDeleteFutbollisti(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteFutbollisti(id)
      .then(() => dispatch(removeFutbollisti(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedFutbollisti) setSelectedFutbollisti(undefined);
    setEditMode(false);
  }

  if (editMode) return <FutbollistiForm futbollisti={selectedFutbollisti} cancelEdit={cancelEdit} />;

  function setPageNumber(arg0: { pageNumber: number; }): any {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Futbollisti
        </Typography>
        <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size="large" variant="contained">
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Futbollisti</TableCell>
              <TableCell align="center">Emri</TableCell>
              <TableCell align="center">Skuadra</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {futbollisti.map((futbollisti) => (
              <TableRow
                key={futbollisti.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {futbollisti.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    {/* Add futbollisti image or other relevant data */}
                    <span>{futbollisti.emri}</span>
                  </Box>
                </TableCell>
                <TableCell align="center">{futbollisti.emri}</TableCell>
                <TableCell align="center">{futbollisti.skuadra}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleSelectFutbollisti(futbollisti)} startIcon={<Edit />} />
                  <LoadingButton
                    loading={loading && target === futbollisti.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteFutbollisti(futbollisti.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />
        </Box>
      )}
    </>
  );
}
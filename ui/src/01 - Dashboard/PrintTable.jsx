import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material/";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const PrintTable = (props) => {
  const { rows, schedDate } = props;

  const handleDownloadTable = () => {
    const pdf = new jsPDF();
    //pdf.text('Hello world!', 10, 10);
    var head = [["Post", "Position", "Member", "Weapon", "Cert"]];
    //pdf.autoTable({ html: '#table' });

    let tableBody = [];
    console.log("rows", rows);

    rows.forEach((row) => {
      let postUsers = row.users.map((user) => {
        if (user.user_info === undefined)
          return [row.name, "N/A", "No one posted", "N/A", "N/A"];
        let workingRow = [
          `${user.user_info[0].first_name} ${user.user_info[0].last_name}`,
        ];
        let wepResults = "";
        for (let wep of user.user_info[0].weapons) {
          if (wepResults.length > 0) {
            wepResults += `, ${wep.weapon}`;
          } else {
            wepResults += `${wep.weapon}`;
          }
        }
        workingRow.push(wepResults);
        let certResults = "";
        for (let cert of user.user_info[0].certs) {
          if (certResults.length > 0) {
            certResults += `, ${cert.cert}`;
          } else {
            certResults += `${cert.cert}`;
          }
        }
        workingRow.push(certResults);
        workingRow.unshift(user.role);
        workingRow.unshift(row.name);
        return workingRow;
      });
      for (let userRow of postUsers) {
        console.log(userRow);
        tableBody.push(userRow);
      }
    });

    console.log("body: ", tableBody);
    pdf.text(`Schedule for: ${schedDate.toDateString()}`, 10, 10);
    pdf.autoTable({ head: head, body: tableBody });
    pdf.save("schedule.pdf");
  };

  return (
    <Box>
      <Tooltip title="Print Today's Schedule">
        <IconButton onClick={() => handleDownloadTable()}>
          <PrintIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

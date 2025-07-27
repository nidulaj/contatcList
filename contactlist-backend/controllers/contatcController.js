const PDFDocument = require("pdfkit");
const {
  createContact,
  getUserID,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../models/contactModel");

const createNewContact = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, birthday } = req.body;
  const username = req.user.username;

  try {
    const userId = await getUserID(username);
    const newContact = await createContact(
      firstName,
      lastName,
      phoneNumber,
      email,
      birthday,
      userId.id
    );
    res
      .status(201)
      .json({ message: "Contact added successfully", contact: newContact });
  } catch (err) {
    console.error("New contact error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getContactByUser = async (req, res) => {
  const username = req.user.username;
  try {
    const userId = await getUserID(username);
    const contacts = await getAllContacts(userId.id);
    res.status(200).json({ contacts });
  } catch (err) {
    console.error("Get contacts error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateExistingContact = async (req, res) => {
  const contactId = req.params.id;
  const { firstName, lastName, phoneNumber, email, birthday } = req.body;

  try {
    const updatedContact = await updateContact(
      firstName,
      lastName,
      phoneNumber,
      email,
      birthday,
      contactId
    );
    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found or not authorized" });
    }

    res
      .status(200)
      .json({ message: "Contact updated", contact: updatedContact });
  } catch (err) {
    console.error("Update contact error :", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteExistingContact = async (req, res) => {
  const contactId = req.params.id;

  try {
    const deletedContact = await deleteContact(contactId);
    if (!deletedContact) {
      return res
        .status(404)
        .json({ message: "Contact not found or not authorized" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    console.error("Delete contact error :", err);
    res.status(500).json({ error: "Server error" });
  }
};

const generateContactsPDF = async (req, res) => {
  const username = req.user.username;

  try {
    const userId = await getUserID(username);
    const contacts = await getAllContacts(userId.id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=contacts.pdf");

    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(res);

    doc.fontSize(18).text("Contact List", { align: "center" });
    doc.moveDown(1);

    const tableTop = doc.y;
    const rowHeight = 20;
    const columnPositions = {
      no: 30,
      firstName: 60,
      lastName: 140,
      phone: 220,
      email: 310,
      birthday: 450,
    };

    // Draw table header background
    doc.rect(30, tableTop, 520, rowHeight).fill('#f0f0f0');
    doc.fillColor('#000').fontSize(10);

    doc.text("No", columnPositions.no, tableTop + 5);
    doc.text("First Name", columnPositions.firstName, tableTop + 5);
    doc.text("Last Name", columnPositions.lastName, tableTop + 5);
    doc.text("Phone", columnPositions.phone, tableTop + 5);
    doc.text("Email", columnPositions.email, tableTop + 5);
    doc.text("Birthday", columnPositions.birthday, tableTop + 5);

    // Draw header bottom border
    doc
      .moveTo(30, tableTop + rowHeight)
      .lineTo(550, tableTop + rowHeight)
      .stroke();

    let y = tableTop + rowHeight;

    contacts.forEach((contact, index) => {
      // Draw row background (zebra style)
      if (index % 2 === 0) {
        doc.rect(30, y, 520, rowHeight).fill('#fafafa');
        doc.fillColor('#000');
      }

      doc
        .fontSize(9)
        .text(String(index + 1), columnPositions.no, y + 5)
        .text(contact.firstName || "", columnPositions.firstName, y + 5)
        .text(contact.lastName || "", columnPositions.lastName, y + 5)
        .text(contact.phoneNumber || "", columnPositions.phone, y + 5)
        .text((contact.email || "").substring(0, 25), columnPositions.email, y + 5)
        .text(
          new Date(contact.birthday).toISOString().split("T")[0] || "",
          columnPositions.birthday,
          y + 5
        );

      // Draw bottom line
      doc
        .moveTo(30, y + rowHeight)
        .lineTo(550, y + rowHeight)
        .stroke();

      y += rowHeight;
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};


module.exports = {
  createNewContact,
  getContactByUser,
  updateExistingContact,
  deleteExistingContact,
  generateContactsPDF,
};

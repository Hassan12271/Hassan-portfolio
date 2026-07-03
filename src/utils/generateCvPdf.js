import { jsPDF } from 'jspdf';
import { formatLiveDuration } from '@/utils/experienceDuration';

const MARGIN = 18;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 5.5;
const SECTION_GAP = 8;

const getExperienceDuration = (item) => {
  if (item.isCurrent && item.durationStart) {
    return formatLiveDuration(item.duration, item.durationStart);
  }

  return item.duration;
};

const wrapText = (doc, text, maxWidth) => {
  return doc.splitTextToSize(text, maxWidth);
};

const ensureSpace = (doc, y, neededHeight) => {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y + neededHeight > pageHeight - MARGIN) {
    doc.addPage();
    return MARGIN;
  }

  return y;
};

const addSectionTitle = (doc, title, y) => {
  y = ensureSpace(doc, y, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(title, MARGIN, y);
  doc.setDrawColor(254, 197, 55);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y + 2, MARGIN + 42, y + 2);

  return y + SECTION_GAP;
};

const addParagraph = (doc, text, y, fontSize = 10) => {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor(55, 55, 55);
  const lines = wrapText(doc, text, CONTENT_WIDTH);
  y = ensureSpace(doc, y, lines.length * LINE_HEIGHT);
  doc.text(lines, MARGIN, y);

  return y + lines.length * LINE_HEIGHT + 3;
};

const addTimelineItem = (doc, item, y) => {
  const duration = getExperienceDuration(item);
  const titleLine = `${item.title} | ${duration}`;
  const subtitleLine = item.subTitle;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  const titleLines = wrapText(doc, titleLine, CONTENT_WIDTH);
  y = ensureSpace(doc, y, titleLines.length * LINE_HEIGHT);
  doc.text(titleLines, MARGIN, y);
  y += titleLines.length * LINE_HEIGHT + 1;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  const subtitleLines = wrapText(doc, subtitleLine, CONTENT_WIDTH);
  y = ensureSpace(doc, y, subtitleLines.length * LINE_HEIGHT);
  doc.text(subtitleLines, MARGIN, y);
  y += subtitleLines.length * LINE_HEIGHT + 1;

  y = addParagraph(doc, item.text, y, 9.5);

  return y + 2;
};

const addPortfolioLink = (doc, item, y) => {
  if (!item.webLink || item.webLink === '#') {
    return y;
  }

  y = ensureSpace(doc, y, LINE_HEIGHT * 2 + 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text(item.title, MARGIN, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(0, 82, 155);
  doc.textWithLink(item.webLink, MARGIN, y + LINE_HEIGHT, { url: item.webLink });

  return y + LINE_HEIGHT * 2 + 2;
};

const addSkillListItem = (doc, title, y) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);
  y = ensureSpace(doc, y, LINE_HEIGHT + 2);
  doc.text(`• ${title}`, MARGIN, y);

  return y + LINE_HEIGHT + 1;
};

export const generateCvPdf = (data) => {
  const { aboutData, resumeData, serviceData, socialData, portfolioData } = data;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  let y = MARGIN;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 20);
  doc.text('Hassan Raza', MARGIN, y);
  y += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(254, 197, 55);
  doc.text(aboutData.subtitle, MARGIN, y);
  y += 8;

  const email = aboutData.details.find((item) => item.title === 'Email')?.info;
  const phone = aboutData.details.find((item) => item.title === 'Phone')?.info;
  const location = aboutData.details.find((item) => item.title === 'From')?.info;
  const website = aboutData.details.find((item) => item.title === 'Website')?.info;
  const linkedin = socialData.find((item) => item.title === 'LinkedIn')?.link;

  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 70);
  const contactLine = [email, phone, location].filter(Boolean).join('  |  ');
  const contactLines = wrapText(doc, contactLine, CONTENT_WIDTH);
  doc.text(contactLines, MARGIN, y);
  y += contactLines.length * LINE_HEIGHT + 2;

  if (website) {
    y = ensureSpace(doc, y, LINE_HEIGHT);
    doc.setTextColor(0, 82, 155);
    doc.textWithLink('hassanraxa.com', MARGIN, y, { url: website });
    y += LINE_HEIGHT + 1;
  }

  if (linkedin) {
    y = ensureSpace(doc, y, LINE_HEIGHT);
    doc.textWithLink(linkedin, MARGIN, y, { url: linkedin });
    y += LINE_HEIGHT + 1;
  }

  y += SECTION_GAP - 2;

  y = addSectionTitle(doc, 'Summary', y);
  y = addParagraph(doc, aboutData.text, y);

  y = addSectionTitle(doc, resumeData.experienceTitle, y);
  resumeData.experience.forEach((item) => {
    y = addTimelineItem(doc, item, y);
  });

  y = addSectionTitle(doc, resumeData.educationTitle, y);
  resumeData.education.forEach((item) => {
    y = addTimelineItem(doc, item, y);
  });

  y = addSectionTitle(doc, 'Skills', y);
  serviceData.services.forEach((item) => {
    y = addSkillListItem(doc, item.title, y);
  });

  const portfolioItems = portfolioData.portfolioItems.filter(
    (item) => item.webLink && item.webLink !== '#',
  );

  if (portfolioItems.length > 0) {
    y = addSectionTitle(doc, 'Portfolio', y);
    portfolioItems.forEach((item) => {
      y = addPortfolioLink(doc, item, y);
    });
  }

  doc.save('Hassan-Raza-CV.pdf');
};

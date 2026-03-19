from docx import Document

doc = Document('deepak PF.docx')
for para in doc.paragraphs:
    if para.text.strip():
        print(para.text)

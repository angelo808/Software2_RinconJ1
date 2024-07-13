const handleFileUpload = require('../fileUpload');

describe('handleFileUpload', () => {
    test('Subir un archivo docx en cualquier tipo y que la aplicación lo filtre', () => {
        const event = { target: { files: [ { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } ] } };
        const result = handleFileUpload(event, 'DS-160');
        expect(result).toBe('Ingrese formato adecuado');
    });

    test('Subir un archivo image/png en tipo DS-160 y que la aplicación lo filtre', () => {
        const event = { target: { files: [ { type: 'image/png' } ] } };
        const result = handleFileUpload(event, 'DS-160');
        expect(result).toBe('Ingrese formato adecuado');
    });

    test('Subir un archivo image/png en tipo PAGO y que el test pase', () => {
        const event = { target: { files: [ { type: 'image/png' } ] } };
        const result = handleFileUpload(event, 'PAGO');
        expect(result).toBe('PAGO Subido');
    });

    test('Subir un archivo application/pdf en tipo PASAPORTE y que el test pase', () => {
        const event = { target: { files: [ { type: 'application/pdf' } ] } };
        const result = handleFileUpload(event, 'PASAPORTE');
        expect(result).toBe('PASAPORTE Subido');
    });
});
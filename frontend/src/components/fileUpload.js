const handleFileUpload = (event, tipo) => {
    const file = event.target.files[0];

    if (tipo == 'DS-160' && file.type == 'application/pdf') {
        // console.log('Documento DS-160 subido correctamente');
        return 'DS-160 Subido';
    } else if ((tipo == 'PAGO' || tipo == 'PASAPORTE') && (file.type.includes('image') || file.type.includes('pdf'))) {
        // console.log(`Documento ${tipo} subido correctamente`);
        return `${tipo} Subido`;
    } else {
        // console.log('Ingrese formato adecuado')
        return 'Ingrese formato adecuado'
    }
}

module.exports = handleFileUpload;
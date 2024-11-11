import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SectionsTable = () => {
    const [sections, setSections] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/api/sections')
            .then(response => {
                const fetchedSections = response.data[0].data.sections.map(section => {
                    
                    return {
                        ...section,
                        items: section.items.map(item => ({
                            ...item,
                            unit_cost: item.unit_cost / 100,
                            quantity: item.quantity || 1, 
                        })),
                        section_total: 0
                    };
                });
                calculateTotals(fetchedSections);
                setSections(fetchedSections);
            })
            .catch(error => console.error('Error fetching sections:', error));
    }, []);

    const calculateTotals = (sections) => {
        
        let total = 0;
        const updatedSections = sections.map(section => {
            const sectionTotal = section.items.reduce((acc, item) => {
                return acc + item.quantity * item.unit_cost;
            }, 0);
            total += sectionTotal;
            return { ...section, section_total: sectionTotal };
        });
        setSections(updatedSections);
        setGrandTotal(total);
    };

    const handleItemChange = (sectionIndex, itemIndex, field, value) => {
        const updatedSections = [...sections];
        const updatedItem = { ...updatedSections[sectionIndex].items[itemIndex], [field]: Number(value) };

      
        updatedSections[sectionIndex].items[itemIndex] = updatedItem;
        updatedSections[sectionIndex].section_total = updatedSections[sectionIndex].items.reduce(
            (acc, item) => acc + item.quantity * item.unit_cost, 0);

       
        setSections(updatedSections);
        setGrandTotal(updatedSections.reduce((acc, sec) => acc + sec.section_total, 0));
    };

    return (
        <div>
            <h1>Grand Total: ${grandTotal.toFixed(2)}</h1>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Section ID</th>
                        <th>Section Name</th>
                        <th>Item ID</th>
                        <th>Item Subject</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Unit Cost</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((section, sectionIndex) => (
                        <React.Fragment key={section.section_id}>
                            {section.items.map((item, itemIndex) => (
                                <tr key={item.item_id}>
                                    {itemIndex === 0 && (
                                        <>
                                            <td rowSpan={section.items.length}>{section.section_id}</td>
                                            <td rowSpan={section.items.length}>{section.section_name}</td>
                                        </>
                                    )}
                                    <td>{item.item_id}</td>
                                    <td>{item.subject}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(sectionIndex, itemIndex, 'quantity', e.target.value)}
                                            onKeyUp={() => calculateTotals(sections)}
                                        />
                                    </td>
                                    <td>{item.unit}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.unit_cost}
                                            onChange={(e) => handleItemChange(sectionIndex, itemIndex, 'unit_cost', e.target.value)}
                                            onKeyUp={() => calculateTotals(sections)}
                                        />
                                    </td>
                                    <td>${(item.quantity * item.unit_cost).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'right' }}><strong>Section Total:</strong></td>
                                <td><strong>${section.section_total.toFixed(2)}</strong></td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SectionsTable;

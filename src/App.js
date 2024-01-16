import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { LinkChange } from './LinkChange'
import './style.css';



const TableRow = ({ item, index }) => (
  <tr key={item.id}>
    <td>
      <Link to={`/${index + 1}`}>{index + 1}</Link>
    </td>
    <td>{item.text}</td>
  </tr>

);



const App = () => {
  const [inputText, setInputText] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    if (inputText.trim() !== '') {
      setTableData([{ text: inputText, id: Date.now() }, ...tableData]);
      setInputText('');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTableData = tableData.slice(startIndex, endIndex);

  return (
    <Router>
      <div>
        <h1><b>React Task 1</b></h1>
        <div>
          <input type="text" value={inputText} onChange={handleInputChange} placeholder="Input text" />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <Routes>
          <Route path='/' element={<TableAndPagination
            tableData={currentTableData}
            startIndex={startIndex}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={tableData.length}
          />} />
          {tableData.map((item, index) => (
            <Route key={item.id} path={`/${index + 1}`} element={<LinkChange item={item.text} />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

const TableAndPagination = ({ tableData, startIndex, onPageChange, currentPage, itemsPerPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span key={i} className={i === currentPage ? 'active' : ''} onClick={() => onPageChange(i)}>
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SR No.</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <TableRow key={item.id} item={item} index={startIndex + index} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
};

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span key={i} className={i === currentPage ? 'active' : ''} onClick={() => onPageChange(i)}>
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      {renderPageNumbers()}
    </div>
  );
};

export default App;

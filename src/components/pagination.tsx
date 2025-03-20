import React from "react";
import { Button, Badge } from "react-bootstrap";

interface PaginationProps {
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
  onPageChange: (url: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ prevUrl, nextUrl, currentPage, onPageChange }) => {
  return (
    <div className="align-items-center d-flex">
      <Button
        variant="outline-primary"
        disabled={!prevUrl}
        onClick={() => prevUrl && onPageChange(prevUrl)}
        size="sm"
      >
        ← 
      </Button>

      <Badge bg="light" text="dark" className="mx-2 rounded-5 fs-5 bg-info-subtle">
        {currentPage}
      </Badge>

      <Button
        variant="outline-primary"
        disabled={!nextUrl}
        onClick={() => nextUrl && onPageChange(nextUrl)}
        size="sm"
      >
        →
      </Button>
    </div>
  );
};

export default Pagination;

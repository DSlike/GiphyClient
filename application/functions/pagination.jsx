import React from 'react';

export const goToPage = (self, page) => { //go to page number
    let searchString = document.getElementById("searchField").value,
        offset = (page - 1) * 20;
    searchString = searchString.replace(" ", "+");
    $.get("http://api.giphy.com/v1/gifs/search?offset=" + offset + "&limit=20&q=" + searchString + "&api_key=dc6zaTOxFJmzC", function(data) {
        self.setState({"data": data});
    });
};

export const prevPage = (self) => { //go to next page
    var offset = self.state.data.pagination.offset - 20;
    $.get("http://api.giphy.com/v1/gifs/trending?limit=20&offset=" + offset + "&api_key=dc6zaTOxFJmzC", function(data) {
        self.setState({"data": data});
    });
}

export const nextPage = (self) => { //go to previous page
    var offset = self.state.data.pagination.offset + 20;
    $.get("http://api.giphy.com/v1/gifs/trending?limit=20&offset=" + offset + "&api_key=dc6zaTOxFJmzC", function(data) {
        self.setState({"data": data});
    });
}

export const generatePagination = (self) => {
    if (self.state.data.pagination.total_count) {
        if (self.state.data.pagination.total_count > 4998)
            var pagesCount = Math.floor(4998 / 20) - 1;
        else
            var pagesCount = Math.floor(self.state.data.pagination.total_count / 20) - 1;
        var currentPage = Math.ceil(self.state.data.pagination.offset / 20);
        if (currentPage < 4) {
            var paginationHtml = (
                <div id="pagination">
                    <div onClick={() => goToPage(self, 1)} className="pagination-button">1</div>
                    <div onClick={() => goToPage(self, 2)} className="pagination-button">2</div>
                    <div onClick={() => goToPage(self, 3)} className="pagination-button">3</div>
                    <div onClick={() => goToPage(self, 4)} className="pagination-button">4</div>
                    <div onClick={() => goToPage(self, 5)} className="pagination-button">5</div>
                    <span className="dots">...</span>
                    <div onClick={() => self.goToPage(self, pagesCount)} className="pagination-button">{pagesCount}</div>
                </div>
            );
        } else if (currentPage >= 4) {
            var paginationHtml = (
                <div id="pagination">
                    <div onClick={() => goToPage(self, 1)} className="pagination-button">1</div>
                    <span className="dots">...</span>
                    <div onClick={() => goToPage(self, currentPage - 2)} className="pagination-button">{currentPage - 2}</div>
                    <div onClick={() => goToPage(self, currentPage - 1)} className="pagination-button">{currentPage - 1}</div>
                    <div onClick={() => goToPage(self, currentPage)} className="pagination-button">{currentPage}</div>
                    <div onClick={() => goToPage(self, currentPage + 1)} className="pagination-button">{currentPage + 1}</div>
                    <div onClick={() => goToPage(self, currentPage + 2)} className="pagination-button">{currentPage + 2}</div>
                    <span className="dots">...</span>
                    <div onClick={() => goToPage(self, pagesCount)} className="pagination-button">{pagesCount}</div>
                </div>
            );
        }
        if (currentPage > pagesCount - 5) {
            var paginationHtml = (
                <div id="pagination">
                    <div onClick={() => goToPage(self, 1)} className="pagination-button">1</div>
                    <span className="dots">...</span>
                    <div onClick={() => goToPage(self, pagesCount - 4)} className="pagination-button">{pagesCount - 4}</div>
                    <div onClick={() => goToPage(self, pagesCount - 3)} className="pagination-button">{pagesCount - 3}</div>
                    <div onClick={() => goToPage(self, pagesCount - 2)} className="pagination-button">{pagesCount - 2}</div>
                    <div onClick={() => goToPage(self, pagesCount - 1)} className="pagination-button">{pagesCount - 1}</div>
                    <div onClick={() => goToPage(self, pagesCount)} className="pagination-button">{pagesCount}</div>
                </div>
            );
        }
    } else {
        if (self.state.data.pagination.offset == 0)
            var paginationHtml = (
                <div id="pagination">
                    <div className="next" onClick={() => nextPage(self)}>next</div>
                </div>
            );
        else
            var paginationHtml = (
                <div id="pagination">
                    <div className="prev" onClick={() => prevPage(self)}>prev</div>
                    <div className="next" onClick={() => nextPage(self)}>next</div>
                </div>
            );
        }
    return paginationHtml;
}

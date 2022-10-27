import React from 'react';
import classNames from 'classnames/bind';

const Pagination = () => {
    return (
        <>
            <section ID="pagination">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center pagination-lg">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                Previous
                            </a>
                        </li>
                        <li class="page-item active" aria-current="page">
                            <a class="page-link " href="#">
                                1
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </>
    );
};

export default Pagination;

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row} from 'reactstrap';
import {getSortState, JhiItemCount, JhiPagination, openFile, Translate,} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from './product.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";

export interface IProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Product = (props: IProductProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const {productList, match, loading, totalItems, isAdmin} = props;
  return (
    <div>
      <h2 id="product-heading">
        <Translate contentKey="storeApp.product.home.title">Products</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          <Translate contentKey="storeApp.product.home.createLabel">Create new Product</Translate>
        </Link>
      </h2>
      <div>
        {productList && productList.length > 0 ? (
          <div>
            <div className="mb-2 d-flex justify-content-end align-items-center">
              <span className="mx-2 col-1">Sort by</span>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-light" onClick={sort('name')}>
                  <span className="d-flex">
                    <Translate contentKey="storeApp.product.name">Name</Translate>&nbsp;
                    <FontAwesomeIcon icon="sort" />
                  </span>
                </button>
                <button type="button" className="btn btn-light" onClick={sort('price')}>
                  <span className="d-flex">
                    <Translate contentKey="storeApp.product.price">Price</Translate>&nbsp;
                    <FontAwesomeIcon icon="sort" />
                  </span>
                </button>
                <button type="button" className="btn btn-light" onClick={sort('size')}>
                  <span className="d-flex">
                    <Translate contentKey="storeApp.product.size">Size</Translate>&nbsp;
                    <FontAwesomeIcon icon="sort" />
                  </span>
                </button>
                <button type="button" className="btn btn-light" onClick={sort('productCategory.id')}>
                  <span className="d-flex">
                    <Translate contentKey="storeApp.product.productCategory">Product Category</Translate>&nbsp;
                    <FontAwesomeIcon icon="sort" />
                  </span>
                </button>

              </div>


            </div>
            <div className="list-group">
              {productList.map((product, i) => (
                <a className="list-group-item list-group-item-action flex-column align-items-start" key={`entity-${i}`}>
                  <div className="row">
                    <div className="col-2 col-xs-12 justify-content-center">
                      {product.image ? (
                        <div>
                          {product.imageContentType ? (
                            <a onClick={openFile(product.imageContentType, product.image)}>
                              <img src={`data:${product.imageContentType};base64,${product.image}`}
                                   style={{maxHeight: '150px'}}/>
                              &nbsp;
                            </a>
                          ) : null}
                        </div>
                      ) : null}

                    </div>
                    <div className="col col-xs-12">
                      <div className="d-flex w-100 justify-content-between">
                        <Link to={`${match.url}/${product.id}`} color="link">
                          <h5 className="mb-1">{product.name}</h5>
                        </Link>
                        {product.productCategory ? (
                          <small>
                            Category:
                            <Link
                              to={`product-category/${product.productCategory.id}`}> {product.productCategory.id}</Link>
                          </small>
                        ) : (
                          ''
                        )}

                      </div>
<<<<<<< HEAD
                    ) : null}
                  </td>
                  <td>
                    {product.productCategory ? (
                      <Link to={`product-category/${product.productCategory.id}`}>{product.productCategory.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${product.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${product.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
=======
                      <small className="mb-1">{product.description}</small>
                      <p className="mb-1">Price: <NumberFormat value={product.price} displayType={'text'}
                                                               thousandSeparator={true} prefix={'$'}/></p>
                      <small className="mb-1">Size: <Translate contentKey={`storeApp.Size.${product.size}`}/></small>
                      {isAdmin && (
                        <div>
                          <Button
                            tag={Link}
                            to={`${match.url}/${product.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="primary"
                            size="sm"
                          >
                            <FontAwesomeIcon icon="pencil-alt"/>{' '}
                            <span className="d-none d-md-inline">
>>>>>>> d4f8d26... update product listing page UI
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`${match.url}/${product.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                            color="danger"
                            size="sm"
                          >
                            <FontAwesomeIcon icon="trash"/>{' '}
                            <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                </a>

              ))}

            </div>
          </div>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="storeApp.product.home.notFound">No Products found</Translate>
            </div>
          )

        )}
      </div>
      {props.totalItems ? (
        <div className={productList && productList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems}
                          itemsPerPage={paginationState.itemsPerPage} i18nEnabled/>
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({product, authentication}: IRootState) => ({
  productList: product.entities,
  loading: product.loading,
  totalItems: product.totalItems,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Product);

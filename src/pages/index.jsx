import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from 'react-emotion';
import Container from '../components/Container';
import { mediaQueries } from '../utils/media-queries';

const VideosSection = ({ data }) => (
  <div id="videos">
    <h1>Videók</h1>

    {data.videos.edges.map(({ node: video }) => (
      <article
        key={video.frontmatter.source}
        css={{
          display: 'flex',
          alignItems: 'center',
          margin: '-2rem',

          '& > *': {
            margin: '2rem',
          },

          '&:nth-child(odd)': {
            flexDirection: 'row-reverse',
          },
        }}
      >
        <div>
          <h2>{video.frontmatter.title}</h2>

          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: video.html }}
          />
        </div>

        <div css={{ flex: '0 0 40%' }}>
          <video
            src={video.frontmatter.source}
            controls
            css={{
              width: '100%',
            }}
          />
        </div>
      </article>
    ))}
  </div>
);

VideosSection.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const GallerySection = ({ data }) => (
  <div id="gallery">
    <h1>Galéria</h1>

    <div
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '-1rem',
      }}
    >
      {data.galleries.edges.map(({ node: gallery }) => (
        <div
          key={gallery.frontmatter.source}
          className={css`
            flex: 100%;
            padding: 1rem;

            & * {
              height: 100%;
            }

            ${mediaQueries.small`
              flex: 50%;
            `};
          `}
        >
          <a href={gallery.frontmatter.source} target="_blank" rel="noreferrer noopener">
            <Img sizes={gallery.frontmatter.thumbnail.childImageSharp.sizes} />
          </a>
        </div>
      ))}
    </div>
  </div>
);

GallerySection.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

const IndexPage = ({ data }) => (
  <div>
    <div
      id="home"
      css={{
        background: 'linear-gradient(227.5deg, #00e676, #009688)',
        color: 'white',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container
        className={css`
          & h1 {
            font-size: 3rem;
          }

          & h2 {
            font-size: 2rem;
          }

          & h3 {
            font-size: 1rem;
          }

          ${mediaQueries.small`
            & h1 {
              font-size: 10vmin;
            }

            & h2 {
              font-size: 5vmin;
            }

            & h3 {
              font-size: 3vmin;
            }
          `};
        `}
      >
        <h1 css={{ wordSpacing: '100vw' }}>{data.site.siteMetadata.title}</h1>
        <h2>2018. április 18.</h2>
        <h2>BME I épület</h2>
        <h3>{data.site.siteMetadata.siteAddressPretty}</h3>
      </Container>
    </div>

    <Container
      css={{
        '& h1': {
          textAlign: 'center',
        },
      }}
    >
      <VideosSection data={data} />
      <GallerySection data={data} />
    </Container>
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        siteAddressPretty
      }
    }
    videos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/videos/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            presenterName
            presenterRole
            source
          }
          html
        }
      }
    }
    galleries: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/gallery/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            source
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 544) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;

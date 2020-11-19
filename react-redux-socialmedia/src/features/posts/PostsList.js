import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectAllPosts, fetchPosts } from './postsSlice';

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch]);

    let content;

    if(postsStatus === "loading") {
        content = <div className="loader">Loading...</div>;
    }else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => (
            <article className="post-excerpt" key={post.id}>
                <h3>{post.title}</h3>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
                <p className="post-content">{post.content.substring(0, 100)}</p>
                <ReactionButtons post={post}/>
                <Link to={`/posts/${post.id}`} className="button muted-button">View post</Link>
            </article>
        ))
    } else if (postsStatus === "failed") {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}
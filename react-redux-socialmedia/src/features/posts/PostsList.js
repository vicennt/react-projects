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
    const postsStatus = useSelector(state => state.posts.status)

    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch]);

    
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date}/>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post}/>
            <Link to={`/posts/${post.id}`} className="button muted-button">View post</Link>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
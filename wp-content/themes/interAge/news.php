<?php
/*
Template Name: News
*/
?>
<?php get_header(); ?>
<section class="news">
    <?php $my_query = new WP_Query('category_name=noticias&showposts=100'); ?>
        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
        <article>
                <h1><?php the_title(); ?></h1>
                <a href="<?php the_permalink(); ?>" name="Conheça o projeto <?php the_title(); ?>"><?php echo excerpt('20'); ?></a>
        </article>
    <?php endwhile; ?>
</section>

<?php get_footer(); ?>
<?php
/*
Template Name: Portfolio
*/
?>
<?php get_header(); ?>
<section class="portfolio">
    <?php $my_query = new WP_Query('category_name=portifolio&showposts=5'); ?>
        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
        <article>
            <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" class="img-responsive" alt="Logo  <?php the_title(); ?>" />
            <div>
                <h1><?php the_title(); ?></h1>
                <a href="<?php the_permalink(); ?>" name="Conheça o projeto <?php the_title(); ?>"><?php echo excerpt('20'); ?></a>
            </div>
        </article>
    <?php endwhile; ?>

</section>

<?php get_footer(); ?>
<?php
/*
Template Name: A Interage
*/
?>
<?php get_header(); ?>
<section>
    <?php $my_query = new WP_Query('p=216'); ?>
        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
        <h1 class="page-title"><?php the_title(); ?></h1>
        <?php the_content (); ?>
    <?php endwhile; ?>
</section>

<?php get_footer(); ?>
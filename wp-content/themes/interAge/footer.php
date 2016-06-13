<?php
/*
Template Name: Footer
*/
?>
        </div><!-- .site-content -->

        <footer id="colophon" class="site-footer" role="contentinfo">
            <div class="footer-aling">
                <div class="title">
                    <?php $my_query = new WP_Query('p=426'); ?>
                        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <h1 class="footer-title"><?php the_title(); ?></h1>
                    <?php endwhile; ?>
                </div>
                <div class="footer-content">
                    <div class="content1">
                        <?php $my_query = new WP_Query('p=426'); ?>
                        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <img src="<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" class="img-responsive" />
                        <div>
                            <?php the_excerpt(); ?>
                            <a href="<?php the_permalink(); ?>"><?php the_meta(); ?></a>
                        </div>
                    <?php endwhile; ?>
                    </div>
                    <div class="content2">
                        <?php $my_query = new WP_Query('p=445'); ?>
                        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                        <?php the_content(); ?>
                    <?php endwhile; ?>
                    </div>

                </div>
                <div class="copyright">
                    <?php $my_query = new WP_Query('p=450'); ?>
                    <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
                    &copy <?php echo get_the_date(Y); ?> <?php the_content(); ?>
                    <?php endwhile; ?>
                </div>
            </div>
        </footer><!-- .site-footer -->
    </div><!-- .site-inner -->
</div><!-- .site -->
</body>
</html>


